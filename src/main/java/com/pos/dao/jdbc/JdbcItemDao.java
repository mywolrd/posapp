package com.pos.dao.jdbc;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import com.pos.dao.ItemDao;
import com.pos.dao.jdbc.mapper.ItemRowMapper;
import com.pos.model.application.Item;

@Repository
public class JdbcItemDao extends JdbcBaseDao implements ItemDao {

    private final static String uniqueByNameAndType = "SELECT * from ITEMS where ITEMS.name = :name and ITEMS.type = :type";

    private final static String listByType = "SELECT * from ITEMS where ITEMS.type = :type";

    private final static String listAll = "SELECT * from ITEMS";

    private final static String insertItem = "insert into ITEMS (name, type, dollar, cent, weight, active) values (:name, :type, :dollar, :cent, :weight, :active)";

    private final static String updateItem = "update ITEMS set name = :name, type = :type, dollar = :dollar, cent = :cent, active = :active, weight = :weight where ITEMS.id = :id ";

    private final static String updateActive = "update ITEMS set active = :active where ITEMS.id = :id";

    private final static String maxWeight = "SELECT MAX(WEIGHT) from ITEMS where ITEMS.ACTIVE = :active and ITEMS.TYPE = :type";

    @Autowired
    private ItemRowMapper rowMapper;

    @Override
    public Item uniqueByNameAndType(String name, String type) {
        SqlParameterSource parameter = new MapSqlParameterSource()
                .addValue(DBNames.NAME, name).addValue(DBNames.TYPE, type);
        try {
            return this.namedParameterJdbcTemplate
                    .queryForObject(uniqueByNameAndType, parameter, rowMapper);
        } catch (DataAccessException e) {
            return null;
        }
    }

    @Override
    public List<Item> listItems() {
        try {
            return this.namedParameterJdbcTemplate.query(listAll, rowMapper);
        } catch (DataAccessException e) {
            return new LinkedList<>();
        }
    }

    @Override
    public List<Item> listItemsByType(long itemTypeId) {
        SqlParameterSource parameter = new MapSqlParameterSource()
                .addValue(DBNames.TYPE, itemTypeId);
        try {
            return this.namedParameterJdbcTemplate.query(listByType, parameter,
                    rowMapper);
        } catch (DataAccessException e) {
            return new LinkedList<>();
        }
    }

    @Override
    public void save(Item item) {
        SqlParameterSource parameter = new MapSqlParameterSource()
                .addValue(DBNames.TYPE, item.getItemTypeId())
                .addValue(DBNames.NAME, item.getName())
                .addValue(DBNames.DOLLAR, item.getPrice().getDollar())
                .addValue(DBNames.CENT, item.getPrice().getCent())
                .addValue(DBNames.WEIGHT, item.getWeight())
                .addValue(DBNames.ACTIVE, Boolean.TRUE);
        try {
            this.namedParameterJdbcTemplate.update(insertItem, parameter);
        } catch (DataAccessException e) {

        }
    }

    @Override
    public void update(Item item) {
        SqlParameterSource parameter = new MapSqlParameterSource()
                .addValue(DBNames.TYPE, item.getItemTypeId())
                .addValue(DBNames.NAME, item.getName())
                .addValue(DBNames.DOLLAR, item.getPrice().getDollar())
                .addValue(DBNames.CENT, item.getPrice().getCent())
                .addValue(DBNames.ACTIVE, item.isActive())
                .addValue(DBNames.WEIGHT, item.getWeight())
                .addValue(DBNames.ID, item.getId());
        try {
            this.namedParameterJdbcTemplate.update(updateItem, parameter);
        } catch (DataAccessException e) {

        }
    }

    @Override
    public void deactivateById(long id) {
        SqlParameterSource parameter = new MapSqlParameterSource()
                .addValue(DBNames.ACTIVE, Boolean.FALSE)
                .addValue(DBNames.ID, id);
        try {
            this.namedParameterJdbcTemplate.update(updateActive, parameter);
        } catch (DataAccessException e) {

        }
    }

    @Override
    public void deactivate(Item item) {
        this.deactivateById(item.getId());
    }

    @Override
    public int getMaxWeight(long itemTypeId) {
        try {
            SqlParameterSource parameter = new MapSqlParameterSource()
                    .addValue(DBNames.ACTIVE, true)
                    .addValue(DBNames.TYPE, itemTypeId);
            Integer weight = this.namedParameterJdbcTemplate
                    .queryForObject(maxWeight, parameter, Integer.class);
            if (null == weight)
                return 0;

            return weight;
        } catch (DataAccessException e) {
            return Integer.MIN_VALUE;
        }
    }
}