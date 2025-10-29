package com.examly.springapp.service;

import com.examly.springapp.exception.ItemNotFoundException;
import com.examly.springapp.model.Item;
import com.examly.springapp.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public Item saveItem(Item item) {
        return itemRepository.save(item);
    }

    @Override
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @Override
    public Optional<Item> getItemById(Long id) {
        return itemRepository.findById(id);
    }

    @Override
    public List<Item> getItemsByCategory(String category) {
        return itemRepository.findByCategory(category);
    }

    @Override
    public List<Item> getItemsSortedByBrand() {
        return itemRepository.findAllByOrderByBrandDesc();
    }

    @Override
    public Item updateItem(Long id, Item item) {
        if (!itemRepository.existsById(id)) {
            throw new ItemNotFoundException("Item with ID " + id + " not found");
        }
        item.setId(id);
        return itemRepository.save(item);
    }

    @Override
    public void deleteItem(Long id) {
        if (!itemRepository.existsById(id)) {
            throw new ItemNotFoundException("Item with ID " + id + " not found");
        }
        itemRepository.deleteById(id);
    }
}
