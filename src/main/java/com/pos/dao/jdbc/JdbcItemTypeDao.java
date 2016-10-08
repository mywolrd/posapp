package com.pos.dao.jdbc;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;

import com.pos.dao.ItemTypeDao;
import com.pos.dao.jdbc.mapper.ItemTypeRowMapper;
import com.pos.model.application.ItemType;

@Repository
public class JdbcItemTypeDao extends JdbcBaseDao implements ItemTypeDao {

    private final static String listAll = "SELECT * FROM ITEM_TYPES";

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

}