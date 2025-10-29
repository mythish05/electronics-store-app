package com.examly.springapp.configuration;

import com.examly.springapp.service.CustomUserDetailsService;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.core.convert.converter.Converter;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.List;

/**
 * Stateless JWT Bearer security using Spring Security's OAuth2 Resource Server.
 * Exposes:
 *  - SecurityFilterChain with /api/auth/** and OpenAPI endpoints permitted
 *  - JwtDecoder based on HS256 secret
 *  - JwtAuthenticationConverter mapping "roles" claim -> GrantedAuthorities
 *  - Basic CORS for localhost dev
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@Profile("!test") // <-- active in prod/dev, NOT in tests
public class SecurityConfig {

    @Value("${app.jwt.secret:ThisIsADevOnlySecretChangeMeToAtLeast32Chars}")
    private String jwtSecret;
    
    private final CustomUserDetailsService userDetailsService;
    
    public SecurityConfig(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/items/**").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter()))
            )
            .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    /** Use the same HS256 key for verifying JWTs as used by JWTUtil to sign them. */
    @Bean
    public JwtDecoder jwtDecoder() {
        SecretKey key = secretKeyFrom(jwtSecret);
        return NimbusJwtDecoder
                .withSecretKey(key)
                .macAlgorithm(MacAlgorithm.HS256)
                .build();
    }

    private SecretKey secretKeyFrom(String secret) {
        try {
            // Prefer Base64 if provided
            return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
        } catch (IllegalArgumentException ignored) {
            return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        }
    }

    /**
     * Map "roles" claim to GrantedAuthorities. We expect values like "ROLE_USER".
     * (If your tokens use plain names like "USER", setAuthorityPrefix("ROLE_") instead.)
     */
    @Bean
    public Converter<Jwt, ? extends AbstractAuthenticationToken> jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter delegate = new JwtGrantedAuthoritiesConverter();
        delegate.setAuthoritiesClaimName("roles");
        delegate.setAuthorityPrefix(""); // roles already include ROLE_ prefix from JWTUtil

        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(delegate);
        return converter;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
    
    /** Password encoder for any form/login flows (useful for issuing tokens). */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /** Simple permissive CORS for local dev; tighten for production. */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cfg = new CorsConfiguration();
        cfg.setAllowedOrigins(List.of(
            "https://8081-fddecedccde329052728bccfaccecftwo.premiumproject.examly.io",
            "http://localhost:3000",
            "http://localhost:8081",
            "http://localhost:8080",
            "https://your-app-name.vercel.app",
            "*"
        ));
        cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        cfg.setAllowedHeaders(List.of("*")); // allow all headers for simplicity
        cfg.setAllowCredentials(true);
    
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cfg);
        return source;
    }
    
}
