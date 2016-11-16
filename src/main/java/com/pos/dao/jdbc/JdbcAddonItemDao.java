package com.pos.dao.jdbc;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import com.pos.dao.AddonItemDao;
import com.pos.dao.jdbc.mapper.AddonItemRowMapper;
import com.pos.model.application.AddonItem;

@Repository
public class JdbcAddonItemDao extends JdbcBaseDao implements AddonItemDao {
    private final static String insertAddonItem = "insert into ADDON_ITEMS (name, dollar, cent, weight, active) values (:name, :dollar, :cent, :weight, :active)";
    private final static String listAll = "SELECT * from ADDON_ITEMS";
    private final static String updateAddonItem = "update ADDON_ITEMS set name = :name, dollar = :dollar, cent = :cent, active = :active, weight = :weight where ADDON_ITEMS.id = :id ";
    private final static String maxWeight = "SELECT MAX(WEIGHT) from ADDON_ITEMS where ADDON_ITEMS.ACTIVE = :active";

    @Autowired
    private AddonItemRowMapper rowMapper;

    @Override
    public List<AddonItem> listAddonItems() {
        try {
            return this.namedParameterJdbcTemplate.query(listAll, rowMapper);
        } catch (DataAccessException e) {
            return new LinkedList<>();
        }
    }

    @Override
    public void save(AddonItem item) {
        SqlParameterSource parameter = new MapSqlParameterSource()
                .addValue(DBNames.NAME, item.getName())
                .addValue(DBNames.DOLLAR, item.getPrice().getDollar())
                .addValue(DBNames.CENT, item.getPrice().getCent())
                .addValue(DBNames.WEIGHT, item.getWeight())
                .addValue(DBNames.ACTIVE, Boolean.TRUE);
        try {
            this.namedParameterJdbcTemplate.update(insertAddonItem, parameter);
        } catch (DataAccessException e) {

        }
    }

    @Override
    public void update(AddonItem item) {
        SqlParameterSource parameter = new MapSqlParameterSource()
                .addValue(DBNames.NAME, item.getName())
                .addValue(DBNames.DOLLAR, item.getPrice().getDollar())
                .addValue(DBNames.CENT, item.getPrice().getCent())
                .addValue(DBNames.ACTIVE, item.isActive())
                .addValue(DBNames.WEIGHT, item.getWeight())
                .addValue(DBNames.ID, item.getId());
        try {
            this.namedParameterJdbcTemplate.update(updateAddonItem, parameter);
        } catch (DataAccessException e) {

        }
    }

    @Override
    public int getMaxWeight() {
        try {
            SqlParameterSource parameter = new MapSqlParameterSource()
                    .addValue(DBNames.ACTIVE, true);
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