package com.examly.springapp.controller;

import com.examly.springapp.model.Item;
import com.examly.springapp.service.ItemService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PostMapping("/additem")
    public ResponseEntity<Item> addItem(@RequestBody Item item) {
        System.out.println("Received item: " + item);
        try {
            Item savedItem = itemService.saveItem(item);
            System.out.println("Saved item: " + savedItem);
            return ResponseEntity.ok(savedItem);
        } catch (Exception e) {
            System.err.println("Error saving item: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/allitems")
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }

    @GetMapping("/byCategory")
    public List<Item> getItemsByCategory(@RequestParam String category) {
        return itemService.getItemsByCategory(category);
    }

    @GetMapping("/sortedByBrand")
    public List<Item> getItemsSortedByBrand() {
        return itemService.getItemsSortedByBrand();
    }

    @GetMapping("/{id}")
    public Item getItemById(@PathVariable Long id) {
        return itemService.getItemById(id)
            .orElseThrow(() -> new RuntimeException("Item not found with id: " + id));
    }

    @PutMapping("/{id}")
    public Item updateItem(@PathVariable Long id, @RequestBody Item item) {
        return itemService.updateItem(id, item);
    }

    @DeleteMapping("/{id}")
    public String deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return "Item with ID " + id + " deleted successfully.";
    }
}
