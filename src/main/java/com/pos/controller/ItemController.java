package com.pos.controller;

import java.util.LinkedList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pos.model.parameter.AddonItemParameter;
import com.pos.model.parameter.ItemParameter;
import com.pos.model.parameter.ItemTypeParameter;
import com.pos.model.persist.AddonItem;
import com.pos.model.persist.Item;
import com.pos.model.persist.ItemType;
import com.pos.model.web.W_AddonItem;
import com.pos.model.web.W_Item;
import com.pos.model.web.W_ItemType;
import com.pos.service.ItemService;
import com.pos.utils.ItemUtils;
import com.pos.utils.POSDatabaseException;

@Controller
@RequestMapping("/item")
public class ItemController {

    private static final Logger logger = LogManager
            .getLogger(ItemController.class);

    @Autowired
    private ItemService itemService;

    @Autowired
    private ItemUtils itemUtils;

    @RequestMapping(value = "/item/list", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<List<W_Item>> listItems() {
        List<Item> items = itemService.listItems();
        List<W_Item> wItems = new LinkedList<W_Item>();
        for (Item item : items) {
            wItems.add(itemUtils.to_W_Item(item));
        }
        return new ResponseEntity<>(wItems, HttpStatus.OK);
    }

    @RequestMapping(value = "/item/itemtypeid/{itemTypeId}/list", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<List<W_Item>> listItemsByType(
            @PathVariable long itemTypeId) {
        List<Item> items = itemService.listItemsByType(itemTypeId);
        List<W_Item> wItems = new LinkedList<W_Item>();
        for (Item item : items) {
            wItems.add(itemUtils.to_W_Item(item));
        }
        return new ResponseEntity<>(wItems, HttpStatus.OK);
    }

    @RequestMapping(value = "/type/list", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<List<W_ItemType>> listItemTypes() {
        List<ItemType> itemTypes = itemService.listItemTypes();
        List<W_ItemType> wItemTypes = new LinkedList<>();
        for (ItemType itemType : itemTypes) {
            wItemTypes.add(itemUtils.to_W_ItemType(itemType));
        }
        return new ResponseEntity<>(wItemTypes, HttpStatus.OK);
    }

    @RequestMapping(value = "/addonitem/list", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<List<W_AddonItem>> listAddonItems() {
        List<AddonItem> addonItems = this.itemService.listAddonItems();
        List<W_AddonItem> wAddonItems = new LinkedList<>();
        for (AddonItem addonItem : addonItems) {
            wAddonItems.add(itemUtils.to_W_AddonItem(addonItem));
        }
        return new ResponseEntity<>(wAddonItems, HttpStatus.OK);
    }

    @RequestMapping(value = "/item", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<Item>> saveOrUpdateItem(
            @RequestBody ItemParameter item) {
        if (0 == item.getItemTypeId()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Item _item = itemUtils.to_Item(item);
        try {
            itemService.saveOrUpdateItem(_item);
        } catch (POSDatabaseException e) {
            logger.error("Could not saveOrUpdate Item.", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
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

        ItemType _itemType = itemUtils.to_ItemType(itemType);
        try {
            itemService.saveOrUpdateItemType(_itemType);
        } catch (POSDatabaseException e) {
            logger.error("Could not saveOrUpdate ItemType.", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        List<ItemType> itemTypes = itemService.listItemTypes();
        return new ResponseEntity<>(itemTypes, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/addonitem", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<AddonItem>> saveOrUpdateAddonItem(
            @RequestBody AddonItemParameter addonItem) {

        if (null == addonItem.getName() || addonItem.getName().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        AddonItem _addonItem = itemUtils.to_AddonItem(addonItem);
        try {
            itemService.saveOrUpdateAddonItem(_addonItem);
        } catch (POSDatabaseException e) {
            logger.error("Could not saveOrUpdate AddonItem.", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        List<AddonItem> addonItems = itemService.listAddonItems();
        return new ResponseEntity<>(addonItems, HttpStatus.OK);
    }

}