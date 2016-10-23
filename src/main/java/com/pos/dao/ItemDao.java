package com.pos.dao;

import java.util.List;

import com.pos.model.application.Item;

public interface ItemDao {

    Item uniqueByNameAndType(String name, String type);

    List<Item> listItems();

    List<Item> listItemsByType(String type);

    void save(Item item);

    void update(Item item);

    void deactivateById(long id);

    void deactivate(Item item);

    int getMaxWeight(long itemTypeId);
}