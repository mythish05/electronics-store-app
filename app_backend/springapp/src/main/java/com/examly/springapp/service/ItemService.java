package com.examly.springapp.service;

import com.examly.springapp.model.Item;
import java.util.List;
import java.util.Optional;

public interface ItemService {
    Item saveItem(Item item);
    List<Item> getAllItems();
    Optional<Item> getItemById(Long id);
    List<Item> getItemsByCategory(String category);
    List<Item> getItemsSortedByBrand();
    Item updateItem(Long id, Item item);
    void deleteItem(Long id);
}