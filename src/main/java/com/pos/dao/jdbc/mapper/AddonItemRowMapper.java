package com.pos.dao.jdbc.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.pos.dao.jdbc.DBNames;
import com.pos.model.application.AddonItem;
import com.pos.model.application.Price;

@Component
public class AddonItemRowMapper implements RowMapper<AddonItem> {

    @Override
    public AddonItem mapRow(ResultSet rs, int rowNum) throws SQLException {
        Price addOnItemPrice = new Price.PriceBuilder()
                .dollar(rs.getInt(DBNames.DOLLAR)).cent(rs.getInt(DBNames.CENT))
                .build();

        AddonItem addOnItem = new AddonItem.AddonItemBuilder(
                rs.getString(DBNames.NAME), addOnItemPrice)
                        .id(rs.getLong(DBNames.ID))
                        .weight(rs.getInt(DBNames.WEIGHT))
                        .active(rs.getBoolean(DBNames.ACTIVE)).build();
        return addOnItem;
    }
}