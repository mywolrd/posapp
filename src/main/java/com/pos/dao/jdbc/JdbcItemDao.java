package com.pos.dao.jdbc;

import java.util.LinkedList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import com.pos.dao.ItemDao;
import com.pos.dao.jdbc.mapper.ItemRowMapper;
import com.pos.model.application.Item;
import com.pos.utils.POSDatabaseException;

@Repository
public class JdbcItemDao extends JdbcBaseDao implements ItemDao {
    private final static String uniqueByNameAndType = "SELECT * from ITEMS where ITEMS.name = :name and ITEMS.type = :type";
    private final static String listByType = "SELECT * from ITEMS where ITEMS.type = :type";
    private final static String listAll = "SELECT * from ITEMS";
    private final static String insertItem = "insert into ITEMS (name, type, dollar, cent, weight, active) values (:name, :type, :dollar, :cent, :weight, :active)";
    private final static String updateActive = "update ITEMS set active = :active where ITEMS.id = :id";
    private final static String maxWeight = "SELECT MAX(WEIGHT) from ITEMS where ITEMS.ACTIVE = :active and ITEMS.TYPE = :type";

    private static final Logger logger = LogManager
            .getLogger(JdbcItemDao.class);

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
            logger.error("Error saving Item : " + item.toString(), e);
            throw new POSDatabaseException(
                    "Error saving Item : " + item.toString(), e);
        }
    }

    @Override
    public void deactivate(long itemId) {
        SqlParameterSource parameter = new MapSqlParameterSource()
                .addValue(DBNames.ACTIVE, false).addValue(DBNames.ID, itemId);
        try {
            this.namedParameterJdbcTemplate.update(updateActive, parameter);
        } catch (DataAccessException e) {
            logger.error("Error deactivating Item : { itemId=" + itemId + " }",
                    e);
            throw new POSDatabaseException(
                    "Error deactivating Item : { itemId=" + itemId + " }", e);
        }
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
            logger.error("Error getting maxWeight from table Item", e);
            throw new POSDatabaseException(e);
        }
    }
}