package com.pos.utils;

import org.springframework.stereotype.Component;

import com.pos.model.parameter.AddonItemParameter;
import com.pos.model.parameter.ItemParameter;
import com.pos.model.parameter.ItemTypeParameter;
import com.pos.model.persist.AddonItem;
import com.pos.model.persist.Item;
import com.pos.model.persist.ItemType;
import com.pos.model.persist.Price;
import com.pos.model.web.W_AddonItem;
import com.pos.model.web.W_Item;
import com.pos.model.web.W_ItemType;

@Component
public class ItemUtils {

    public W_Item to_W_Item(Item item) {
        W_Item wItem = new W_Item();
        wItem.setId(item.getId());
        wItem.setItemTypeId(item.getItemTypeId());
        wItem.setName(item.getName());
        wItem.setPrice(to_Price(item.getPrice()));
        wItem.setWeight(item.getWeight());
        wItem.setActive(item.isActive());
        return wItem;
    }

    public W_ItemType to_W_ItemType(ItemType itemType) {
        W_ItemType wItemType = new W_ItemType();
        wItemType.setId(itemType.getId());
        wItemType.setName(itemType.getName());
        wItemType.setWeight(itemType.getWeight());
        wItemType.setActive(itemType.isActive());
        return wItemType;
    }

    public W_AddonItem to_W_AddonItem(AddonItem addonItem) {
        W_AddonItem wAddonItem = new W_AddonItem();
        wAddonItem.setId(addonItem.getId());
        wAddonItem.setName(addonItem.getName());
        wAddonItem.setPrice(to_Price(addonItem.getPrice()));
        wAddonItem.setWeight(addonItem.getWeight());
        wAddonItem.setActive(addonItem.isActive());
        return wAddonItem;
    }

    public ItemType to_ItemType(ItemTypeParameter param) {
        ItemType itemType = new ItemType();
        itemType.setId(param.getId());
        itemType.setName(param.getName());
        itemType.setWeight(param.getWeight());
        itemType.setActive(param.isActive());
        return itemType;
    }

    public Item to_Item(ItemParameter param) {
        Item item = new Item();
        item.setId(param.getId());
        item.setItemTypeId(param.getItemTypeId());
        item.setName(param.getName());
        item.setPrice(to_Price(param.getDollar(), param.getCent()));
        item.setWeight(param.getWeight());
        item.setActive(param.isActive());
        return item;
    }

    public AddonItem to_AddonItem(AddonItemParameter param) {
        AddonItem addonItem = new AddonItem();
        addonItem.setId(param.getId());
        addonItem.setName(param.getName());
        addonItem.setPrice(to_Price(param.getDollar(), param.getCent()));
        addonItem.setWeight(param.getWeight());
        addonItem.setActive(param.isActive());
        return addonItem;
    }

    public ItemType new_itemType_weight(ItemType itemType, int weight) {
        ItemType _itemType = new ItemType();
        _itemType.setId(0);
        _itemType.setName(itemType.getName());
        _itemType.setWeight(weight);
        _itemType.setActive(itemType.isActive());
        return _itemType;
    }

    public Item new_item_weight(Item item, int weight) {
        Item _item = new Item();
        _item.setId(0);
        _item.setItemTypeId(item.getItemTypeId());
        _item.setName(item.getName());
        _item.setPrice(to_Price(item.getPrice()));
        _item.setWeight(weight);
        _item.setActive(item.isActive());
        return _item;
    }

    public AddonItem new_addonItem_weight(AddonItem addonItem, int weight) {
        AddonItem _addonItem = new AddonItem();
        _addonItem.setId(0);
        _addonItem.setName(addonItem.getName());
        _addonItem.setPrice(to_Price(addonItem.getPrice()));
        _addonItem.setWeight(weight);
        _addonItem.setActive(addonItem.isActive());
        return _addonItem;
    }

    private Price to_Price(Price price) {
        Price _price = new Price();
        _price.setCent(price.getCent());
        _price.setDollar(price.getDollar());
        return _price;
    }

    private Price to_Price(int dollar, int cent) {
        Price price = new Price();
        price.setCent(cent);
        price.setDollar(dollar);
        return price;
    }
}