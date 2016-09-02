package com.pos.dao.jdbc.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.pos.dao.jdbc.DBNames;
import com.pos.model.application.AddOnItem;
import com.pos.model.application.Price;

public class AddOnItemMapper implements RowMapper<AddOnItem> {

    @Override
    public AddOnItem mapRow(ResultSet rs, int rowNum) throws SQLException {
        Price addOnItemPrice = new Price.PriceBuilder().dollar(rs.getInt(DBNames.DOLLAR)).cent(rs.getInt(DBNames.CENT)).build();

        AddOnItem addOnItem = new AddOnItem.AddOnItemBuilder(rs.getString(DBNames.NAME), addOnItemPrice).id(rs.getLong(DBNames.ID)).build();
        return addOnItem;
    }
}