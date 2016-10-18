package com.pos.dao.jdbc;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import com.pos.dao.ItemTypeDao;
import com.pos.dao.jdbc.mapper.ItemTypeRowMapper;
import com.pos.model.application.ItemType;

@Repository
public class JdbcItemTypeDao extends JdbcBaseDao implements ItemTypeDao {

    private final static String listAll = "SELECT * FROM ITEM_TYPES";

    private final static String maxWeight = "SELECT MAX(WEIGHT) from ITEM_TYPES where ITEM_TYPES.ACTIVE = :active";
    
    private final static String insertItemType = "insert into ITEM_TYPES (name, weight, active) values (:name, :weight, :active)";
    
    private final static String updateItemType = "update ITEM_TYPES set name = :name, weight = :weight, active = :active where ITEM_TYPES.id = :id";
    
    @Autowired
    private ItemTypeRowMapper rowMapper;

    @Override
    public List<ItemType> listItemTypes() {
        try {
            return this.namedParameterJdbcTemplate.query(listAll, rowMapper);
        } catch (DataAccessException e) {
            return new LinkedList<>();
        }
    }
    
    @Override
    public int getMaxWeight() {
    	try {
    		SqlParameterSource parameter = new MapSqlParameterSource()
                    .addValue(DBNames.ACTIVE, true);
    		Integer weight = this.namedParameterJdbcTemplate.queryForObject(maxWeight, parameter, Integer.class);
    		if (null == weight)
    			return 0;
    		
    		return weight;
    	} catch (DataAccessException e) {
    		return Integer.MIN_VALUE;
    	}
    }

    @Override
    public void save(ItemType itemType) {
    	try {
    		SqlParameterSource parameter = new MapSqlParameterSource().addValue(DBNames.NAME, itemType.getName())
                    .addValue(DBNames.ACTIVE, itemType.isActive()).addValue(DBNames.WEIGHT, itemType.getWeight());
    		this.namedParameterJdbcTemplate.update(insertItemType, parameter);
    	} catch (DataAccessException e) {
    		
    	}
    }
    
    @Override
    public void update(ItemType itemType) {
    	try {
    		SqlParameterSource parameter = new MapSqlParameterSource().addValue(DBNames.NAME, itemType.getName())
                    .addValue(DBNames.ACTIVE, itemType.isActive()).addValue(DBNames.WEIGHT, itemType.getWeight()).addValue(DBNames.ID, itemType.getId());
    		this.namedParameterJdbcTemplate.update(updateItemType, parameter);
    	} catch (DataAccessException e) {
    		
    	}
    }
}