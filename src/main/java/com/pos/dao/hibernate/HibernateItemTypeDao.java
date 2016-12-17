package com.pos.dao.hibernate;

import org.springframework.stereotype.Repository;

import com.pos.dao.ItemTypeDao;
import com.pos.model.persist.ItemType;

@Repository
public class HibernateItemTypeDao extends
        HibernateWeightedBaseDao<ItemType, Long> implements ItemTypeDao {

}