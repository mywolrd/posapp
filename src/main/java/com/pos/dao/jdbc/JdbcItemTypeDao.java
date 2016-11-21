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

import com.pos.dao.ItemTypeDao;
import com.pos.dao.jdbc.mapper.ItemTypeRowMapper;
import com.pos.model.application.ItemType;
import com.pos.utils.POSDatabaseException;

@Repository
public class JdbcItemTypeDao extends JdbcBaseDao implements ItemTypeDao {

    private final static String listAll = "SELECT * FROM ITEM_TYPES";
    private final static String maxWeight = "SELECT MAX(WEIGHT) from ITEM_TYPES where ITEM_TYPES.ACTIVE = :active";
    private final static String insertItemType = "insert into ITEM_TYPES (name, weight, active) values (:name, :weight, :active)";
    private final static String updateActive = "update ITEM_TYPES set active = :active where ITEM_TYPES.id = :id";

    private final static Logger logger = LogManager
            .getLogger(JdbcItemTypeDao.class);

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
            Integer weight = this.namedParameterJdbcTemplate
                    .queryForObject(maxWeight, parameter, Integer.class);
            if (null == weight) {
                System.out.println("Here");
                return 0;
            }
            return weight;
        } catch (DataAccessException e) {
            logger.error("Error getting maxWeight from table ItemType", e);
            throw new POSDatabaseException(e);
        }
    }

    @Override
    public void save(ItemType itemType) {
        try {
            SqlParameterSource parameter = new MapSqlParameterSource()
                    .addValue(DBNames.NAME, itemType.getName())
                    .addValue(DBNames.ACTIVE, itemType.isActive())
                    .addValue(DBNames.WEIGHT, itemType.getWeight());
            this.namedParameterJdbcTemplate.update(insertItemType, parameter);
        } catch (DataAccessException e) {
            logger.error("Error saving ItemType : " + itemType.toString(), e);
            throw new POSDatabaseException(
                    "Error saving ItemType : " + itemType.toString(), e);
        }
    }

    @Override
    public void deactivate(long itemTypeId) {
        try {
            SqlParameterSource parameter = new MapSqlParameterSource()
                    .addValue(DBNames.ACTIVE, false)
                    .addValue(DBNames.ID, itemTypeId);
            this.namedParameterJdbcTemplate.update(updateActive, parameter);
        } catch (DataAccessException e) {
            logger.error("Error deactivating Item : { itemTypeId=" + itemTypeId
                    + " }", e);
            throw new POSDatabaseException(
                    "Error deactivating Item : { itemTypeId=" + itemTypeId
                            + " }",
                    e);
        }
    }
}