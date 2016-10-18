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
import com.pos.model.parameter.ItemTypeParameter;

@Service
public class ItemService {

    @Autowired
    private ItemDao itemDao;

    @Autowired
    private ItemTypeDao itemTypeDao;

    @Transactional(readOnly = true)
    public List<Item> listItems() {
        return itemDao.listItems();
    }

    public List<ItemType> listItemTtypes() {
        return itemTypeDao.listItemTypes();
    }

    public List<Item> listActiveItems() {
        List<Item> allItems = this.listItems();
        List<Item> activeItems = new LinkedList<>();
        for (Item item : allItems) {
            if (item.isActive()) {
                activeItems.add(item);
            }
        }
        return activeItems;
    }
    
    public void saveOrUpdateItemType(ItemTypeParameter itemType) {
    	if (0 == itemType.getId()) {
    		saveItemType(itemType);
    	} else {
    		updateItemType(itemType);
    	}
    }
    
    private void saveItemType(ItemTypeParameter itemType) {
    	int weight = this.itemTypeDao.getMaxWeight();
    	weight++;
    	ItemType newItemType = new ItemType.ItemTypeBuilder(itemType).weight(weight).build();
    	itemTypeDao.save(newItemType);
    }
    
    private void updateItemType(ItemTypeParameter itemType) {
    	ItemType updatedItemType = new ItemType.ItemTypeBuilder(itemType).build();
    	itemTypeDao.update(updatedItemType);
    }
}