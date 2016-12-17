package com.pos.dao;

import java.util.List;

import com.pos.model.persist.Item;

public interface ItemDao extends HibernateWeightedDao<Item, Long> {

    List<Item> listItemsByType(long itemTypeId);

    int getMaxWeight(long itemTypeId);
}