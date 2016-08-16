package com.pos.service;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pos.dao.ItemDao;
import com.pos.model.application.Item;

@Service
public class ItemService {

    @Autowired
    private ItemDao itemDao;

    @Transactional(readOnly = true)
    public List<Item> listItems() {
        return itemDao.listItems();
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

}