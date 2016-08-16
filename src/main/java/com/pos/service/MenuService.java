package com.pos.service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pos.model.application.Item;
import com.pos.model.application.ItemType;
import com.pos.model.application.MenuItem;
import com.pos.model.application.Price;

@Service
public class MenuService {

    @Autowired
    private ItemService itemService;

    public List<MenuItem> listMenuItem() {
        List<Item> items = itemService.listActiveItems();
        return this.groupMenuItemByType(items);
    }

    private List<MenuItem> groupMenuItemByType(List<Item> items) {

        List<MenuItem> itemMenuList = new ArrayList<>();
        Map<ItemType, List<Item>> groups = this.groupItemByType(items);

        for (Entry<ItemType, List<Item>> entry : groups.entrySet()) {

            ItemType type = entry.getKey();
            List<MenuItem> submenu = this.buildMenuItem(entry.getValue());

            Item tempItem = new Item.ItemBuilder(type, Price.nothing()).build();
            MenuItem itemMenu = new MenuItem.MenuBuilder().item(tempItem).submenu(submenu).build();
            itemMenuList.add(itemMenu);
        }
        return itemMenuList;
    }

    public List<MenuItem> buildMenuItem(List<Item> items) {
        return items.stream().map(p -> new MenuItem.MenuBuilder().item(p).build()).collect(Collectors.toCollection(LinkedList::new));
    }

    public Map<ItemType, List<Item>> groupItemByType(List<Item> items) {
        return items.stream().collect(Collectors.groupingBy(Item::getItemType));
    }
}