package com.pos.dao;

import java.util.List;

import com.pos.model.application.ItemType;

public interface ItemTypeDao {

    List<ItemType> listItemTypes();

    int getMaxWeight();

    void save(ItemType itemType);

    void deactivate(long itemTypeId);
}