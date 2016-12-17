package com.pos.service;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pos.dao.AddonItemDao;
import com.pos.dao.ItemDao;
import com.pos.dao.ItemTypeDao;
import com.pos.model.persist.Active;
import com.pos.model.persist.AddonItem;
import com.pos.model.persist.Item;
import com.pos.model.persist.ItemType;
import com.pos.utils.ItemUtils;
import com.pos.utils.POSDatabaseException;

@Service
public class ItemService {

    @Autowired
    private ItemDao itemDao;

    @Autowired
    private ItemTypeDao itemTypeDao;

    @Autowired
    private AddonItemDao addonItemDao;

    @Autowired
    private ItemUtils itemUtils;

    private <T extends Active> List<T> filterActive(List<T> list) {
        List<T> filtered = new LinkedList<>();
        for (T item : list) {
            if (item.isActive())
                filtered.add(item);
        }
        return filtered;
    }

    @Transactional
    public List<Item> listItems() {
        return itemDao.list();
    }

    @Transactional
    public List<Item> listActiveItems() {
        List<Item> items = itemDao.list();
        return this.filterActive(items);
    }

    @Transactional
    public List<Item> listItemsByType(long itemTypeId) {
        return itemDao.listItemsByType(itemTypeId);
    }

    @Transactional
    public List<Item> listActiveItemsByType(long itemTypeId) {
        List<Item> items = itemDao.listItemsByType(itemTypeId);
        return this.filterActive(items);
    }

    @Transactional
    public List<ItemType> listItemTypes() {
        return itemTypeDao.list();
    }

    @Transactional
    public List<ItemType> listActiveItemTypes() {
        List<ItemType> itemTypes = itemTypeDao.list();
        return this.filterActive(itemTypes);
    }

    @Transactional
    public List<AddonItem> listAddonItems() {
        return this.addonItemDao.list();
    }

    @Transactional
    public List<AddonItem> listActiveAddonItems() {
        List<AddonItem> addonItems = this.addonItemDao.list();
        return this.filterActive(addonItems);
    }

    /*
     * SaveOrUpdate methods. Older orders may require unmodified ItemType, Item,
     * AddonItem. This method changes the active flag to false in the database
     * when updating an existing record, and inserts a record.
     */

    @Transactional
    public void saveOrUpdateItemType(ItemType itemType)
            throws POSDatabaseException {
        if (0 != itemType.getId()) {
            this.deactivateItemType(itemType.getId());
        }

        if (itemType.isActive()) {
            this.saveItemType(itemType);
        }
    }

    @Transactional
    public void saveOrUpdateItem(Item item) throws POSDatabaseException {

        if (0 != item.getId()) {
            this.deactivateItem(item.getId());
        }

        if (item.isActive()) {
            this.saveItem(item);
        }
    }

    @Transactional
    public void saveOrUpdateAddonItem(AddonItem addonItem)
            throws POSDatabaseException {
        if (0 != addonItem.getId()) {
            this.deactivateAddonItem(addonItem.getId());
        }

        if (addonItem.isActive()) {
            this.saveAddonItem(addonItem);
        }
    }

    private void deactivateItemType(long itemTypeId) {
        ItemType _itemType = this.itemTypeDao.uniqueForId(itemTypeId);
        _itemType.setActive(false);
        this.itemTypeDao.update(_itemType);
    }

    private void deactivateItem(long itemId) {
        Item _item = this.itemDao.uniqueForId(itemId);
        _item.setActive(false);
        this.itemDao.update(_item);
    }

    private void deactivateAddonItem(long addonItemId) {
        AddonItem _addonItem = this.addonItemDao.uniqueForId(addonItemId);
        _addonItem.setActive(false);
        this.addonItemDao.update(_addonItem);
    }

    private void saveItemType(ItemType itemType) {
        int weight = itemType.getWeight() == 0
                ? this.itemTypeDao.getMaxWeight() + 1 : itemType.getWeight();

        ItemType newItemType = itemUtils.new_itemType_weight(itemType, weight);
        this.itemTypeDao.save(newItemType);
    }

    private void saveItem(Item item) {
        int weight = item.getWeight() == 0
                ? this.itemDao.getMaxWeight(item.getItemTypeId()) + 1
                : item.getWeight();

        Item _newItem = itemUtils.new_item_weight(item, weight);
        this.itemDao.save(_newItem);
    }

    private void saveAddonItem(AddonItem addonItem) {
        int weight = addonItem.getWeight() == 0
                ? this.addonItemDao.getMaxWeight() + 1 : addonItem.getWeight();

        AddonItem _addonItem = itemUtils.new_addonItem_weight(addonItem,
                weight);
        this.addonItemDao.save(_addonItem);
    }
}