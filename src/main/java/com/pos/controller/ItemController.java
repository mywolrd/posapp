package com.pos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pos.model.application.AddonItem;
import com.pos.model.application.Item;
import com.pos.model.application.ItemType;
import com.pos.model.parameter.AddonItemParameter;
import com.pos.model.parameter.ItemParameter;
import com.pos.model.parameter.ItemTypeParameter;
import com.pos.service.ItemService;

@Controller
@RequestMapping("/item")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @RequestMapping(value = "/item/list", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<List<Item>> listItems() {
        List<Item> items = itemService.listItems();
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @RequestMapping(value = "/item/itemtypeid/{itemTypeId}/list", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<List<Item>> listItemsByType(
            @PathVariable long itemTypeId) {
        List<Item> items = itemService.listItemsByType(itemTypeId);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @RequestMapping(value = "/type/list", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<List<ItemType>> listItemTypes() {
        List<ItemType> itemTypes = itemService.listItemTypes();
        return new ResponseEntity<>(itemTypes, HttpStatus.OK);
    }

    @RequestMapping(value = "/item", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<Item>> saveOrUpdateItem(
            @RequestBody ItemParameter item) {
        if (0 == item.getItemTypeId()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Item _item = new Item.ItemBuilder(item).build();
        itemService.saveOrUpdateItem(_item);

        List<Item> items = itemService.listItemsByType(_item.getItemTypeId());
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @RequestMapping(value = "/type", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<ItemType>> saveOrUpdateItemType(
            @RequestBody ItemTypeParameter itemType) {

        if (null == itemType.getName() || itemType.getName().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        ItemType _itemType = new ItemType.ItemTypeBuilder(itemType).build();
        itemService.saveOrUpdateItemType(_itemType);

        List<ItemType> itemTypes = itemService.listItemTypes();
        return new ResponseEntity<>(itemTypes, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/addonitem/list", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<List<AddonItem>> listAddonItems() {
        List<AddonItem> items = this.itemService.listAddonItems();
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @RequestMapping(value = "/addonitem", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<AddonItem>> saveOrUpdateAddonItem(
            @RequestBody AddonItemParameter addonItem) {

        if (null == addonItem.getName() || addonItem.getName().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        AddonItem _addonItem = new AddonItem.AddonItemBuilder(addonItem)
                .build();
        itemService.saveOrUpdateAddonItem(_addonItem);

        List<AddonItem> addonItems = itemService.listAddonItems();
        return new ResponseEntity<>(addonItems, HttpStatus.OK);
    }

}