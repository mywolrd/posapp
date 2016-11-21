package com.pos.service;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pos.dao.AddonItemDao;
import com.pos.dao.ItemDao;
import com.pos.dao.ItemTypeDao;
import com.pos.model.application.AddonItem;
import com.pos.model.application.Item;
import com.pos.model.application.ItemType;
import com.pos.utils.POSDatabaseException;

@Service
public class ItemService {

    @Autowired
    private ItemDao itemDao;

    @Autowired
    private ItemTypeDao itemTypeDao;

    @Autowired
    private AddonItemDao addonItemDao;

    @Transactional(readOnly = true)
    public List<Item> listItems() {
        List<Item> items = itemDao.listItems();
        return this.listActiveItems(items);
    }

    @Transactional(readOnly = true)
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

    @Transactional(readOnly = true)
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

    @Transactional(readOnly = true)
    public List<AddonItem> listAddonItems() {
        List<AddonItem> addonItems = this.addonItemDao.listAddonItems();
        return this.listActiveAddonItems(addonItems);
    }

    public List<AddonItem> listActiveAddonItems(List<AddonItem> addonItems) {
        List<AddonItem> active = new LinkedList<>();
        for (AddonItem item : addonItems) {
            if (item.isActive())
                active.add(item);
        }
        return active;
    }

    /*
     * SaveOrUpdate methods. Older orders may require unmodified ItemType, Item,
     * AddonItem. This method changes the active flag to false in the database
     * when updating an existing record, and inserts a record.
     */
    @Transactional(readOnly = false)
    public void saveOrUpdateItem(Item item) throws POSDatabaseException {

        if (0 != item.getId()) {
            this.itemDao.deactivate(item.getId());
        }

        if (item.isActive()) {
            Item _item = new Item.ItemBuilder(item).id(0).build();
            this.saveItem(_item);
        }
    }

    @Transactional(readOnly = false)
    public void saveOrUpdateItemType(ItemType itemType)
            throws POSDatabaseException {

        if (0 != itemType.getId()) {
            this.itemTypeDao.deactivate(itemType.getId());
        }

        if (itemType.isActive()) {
            ItemType _itemType = new ItemType.ItemTypeBuilder(itemType).id(0)
                    .build();
            this.saveItemType(_itemType);
        }
    }

    @Transactional(readOnly = false)
    public void saveOrUpdateAddonItem(AddonItem addonItem)
            throws POSDatabaseException {
        if (0 != addonItem.getId()) {
            this.addonItemDao.deactivate(addonItem.getId());
        }

        if (addonItem.isActive()) {
            AddonItem _addonItem = new AddonItem.AddonItemBuilder(addonItem)
                    .id(0).build();
            this.saveAddonItem(_addonItem);
        }
    }

    private void saveItem(Item item) {
        int weight = item.getWeight() == 0
                ? this.itemDao.getMaxWeight(item.getItemTypeId()) + 1
                : item.getWeight();
        // TODO
        // Throw an exception in Dao and catch in controller
        Item _newItem = new Item.ItemBuilder(item).weight(weight).build();
        this.itemDao.save(_newItem);
    }

    private void saveItemType(ItemType itemType) {
        // TODO
        // What should happen when there are two save operations, each from a
        // different instances of the same app?
        int weight = itemType.getWeight() == 0
                ? this.itemTypeDao.getMaxWeight() + 1 : itemType.getWeight();
        // TODO
        // Throw an exception in Dao and catch in controller
        ItemType newItemType = new ItemType.ItemTypeBuilder(itemType)
                .weight(weight).build();
        this.itemTypeDao.save(newItemType);
    }

    private void saveAddonItem(AddonItem addonItem) {
        int weight = addonItem.getWeight() == 0
                ? this.addonItemDao.getMaxWeight() + 1 : addonItem.getWeight();

        AddonItem _addonItem = new AddonItem.AddonItemBuilder(addonItem)
                .weight(weight).build();
        this.addonItemDao.save(_addonItem);

    }
}