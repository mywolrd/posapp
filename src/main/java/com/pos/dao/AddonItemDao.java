package com.pos.dao;

import java.util.List;

import com.pos.model.application.AddonItem;

public interface AddonItemDao {

    List<AddonItem> listAddonItems();

    void save(AddonItem item);

    void deactivate(long addonItemId);

    int getMaxWeight();
}