package com.examly.springapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringappApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringappApplication.class, args);
        System.out.println("Electronics Store Application Started Successfully!");
        System.out.println("Server running on: http://localhost:8090");
        System.out.println("Auth endpoints: /api/auth/register, /api/auth/login");
        System.out.println("Item endpoints: /api/items/additem, /api/items/allitems");
    }
}