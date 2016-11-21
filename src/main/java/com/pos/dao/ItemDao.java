package com.pos.dao;

import java.util.List;

import com.pos.model.application.Item;

public interface ItemDao {

    Item uniqueByNameAndType(String name, String type);

    List<Item> listItems();

    List<Item> listItemsByType(long itemTypeId);

    void save(Item item);

    void deactivate(long itemId);

    int getMaxWeight(long itemTypeId);
}