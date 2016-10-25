package com.pos.service;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pos.dao.ItemDao;
import com.pos.dao.ItemTypeDao;
import com.pos.model.application.Item;
import com.pos.model.application.ItemType;

@Service
public class ItemService {

    @Autowired
    private ItemDao itemDao;

    @Autowired
    private ItemTypeDao itemTypeDao;

    @Transactional(readOnly = true)
    public List<Item> listItems() {
        List<Item> items = itemDao.listItems();
        return this.listActiveItems(items);
    }

    public List<Item> listItemsByType(long itemTypeId) {
        List<Item> items = itemDao.listItemsByType(itemTypeId);
        return this.listActiveItems(items);
    }

    private List<Item> listActiveItems(List<Item> items) {
        List<Item> activeItems = new LinkedList<>();
        for (Item item : items) {
            if (item.isActive())
                activeItems.add(item);
        }
        return activeItems;
    }

    public List<ItemType> listItemTypes() {
        List<ItemType> itemTypes = itemTypeDao.listItemTypes();
        return this.listActiveItemType(itemTypes);
    }

    public List<ItemType> listActiveItemType(List<ItemType> itemTypes) {
        List<ItemType> activeItems = new LinkedList<>();
        for (ItemType itemType : itemTypes) {
            if (itemType.isActive())
                activeItems.add(itemType);
        }
        return activeItems;
    }

    public void saveOrUpdateItem(Item item) {
        if (0 == item.getId()) {
            this.saveItem(item);
        } else {
            this.updateItem(item);
        }
    }

    public void saveOrUpdateItemType(ItemType itemType) {
        if (0 == itemType.getId()) {
            this.saveItemType(itemType);
        } else {
            this.updateItemType(itemType);
        }
    }

    private void saveItem(Item item) {
        int weight = this.itemDao.getMaxWeight(item.getItemTypeId());
        // TODO
        // Throw an exception in Dao and catch in controller
        if (Integer.MIN_VALUE != weight) {
            weight++;

            Item _newItem = new Item.ItemBuilder(item).weight(weight).build();
            this.itemDao.save(_newItem);
        }
    }

    private void updateItem(Item item) {
        this.itemDao.update(item);
    }

    private void saveItemType(ItemType itemType) {
        // TODO
        // What should happen when there are two save operations, each from a
        // different instances of the same app?
        int weight = this.itemTypeDao.getMaxWeight();
        // TODO
        // Throw an exception in Dao and catch in controller
        if (Integer.MIN_VALUE != weight) {
            weight++;
            ItemType newItemType = new ItemType.ItemTypeBuilder(itemType)
                    .weight(weight).build();
            this.itemTypeDao.save(newItemType);
        }
    }

    private void updateItemType(ItemType itemType) {
        this.itemTypeDao.update(itemType);
    }
}