package com.pos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pos.model.application.Item;
import com.pos.model.application.ItemType;
import com.pos.model.parameter.ItemParameter;
import com.pos.model.parameter.ItemTypeParameter;
import com.pos.service.ItemService;

@Controller
@RequestMapping("/item")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<List<Item>> listItems() {
        List<Item> items = itemService.listActiveItems();
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @RequestMapping(value = "/type/list", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<List<ItemType>> listItemTypes() {
        List<ItemType> itemTypes = itemService.listItemTtypes();
        return new ResponseEntity<>(itemTypes, HttpStatus.OK);
    }

    @RequestMapping(value = "/item", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Item> saveOrUpdateItem(
            @RequestBody ItemParameter item) {
        if (0 == item.getItemTypeId()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Item _item = new Item.ItemBuilder(item).build();
        itemService.saveOrUpdateItem(_item);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/type", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<ItemType> saveOrUpdateItemType(
            @RequestBody ItemTypeParameter itemType) {

        if (null == itemType.getName() || itemType.getName().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        ItemType _itemType = new ItemType.ItemTypeBuilder(itemType).build();
        itemService.saveOrUpdateItemType(_itemType);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}