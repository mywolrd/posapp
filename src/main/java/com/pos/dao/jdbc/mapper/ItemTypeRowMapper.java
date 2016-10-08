package com.pos.dao.jdbc.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.pos.dao.jdbc.DBNames;
import com.pos.model.application.ItemType;

@Component
public class ItemTypeRowMapper implements RowMapper<ItemType> {

    @Override
    public ItemType mapRow(ResultSet rs, int rowNum) throws SQLException {
        ItemType itemType = new ItemType(rs.getLong(DBNames.ID),
                rs.getString(DBNames.NAME), rs.getInt(DBNames.WEIGHT),
                rs.getBoolean(DBNames.ACTIVE));
        return itemType;
    }

}