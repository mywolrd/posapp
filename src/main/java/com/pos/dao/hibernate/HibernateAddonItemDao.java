package com.pos.dao.hibernate;

import org.springframework.stereotype.Repository;

import com.pos.dao.AddonItemDao;
import com.pos.model.persist.AddonItem;

@Repository
public class HibernateAddonItemDao extends
        HibernateWeightedBaseDao<AddonItem, Long> implements AddonItemDao {

}