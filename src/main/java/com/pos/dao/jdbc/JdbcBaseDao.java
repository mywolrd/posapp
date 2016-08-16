package com.pos.dao.jdbc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

public class JdbcBaseDao {

    @Autowired
    protected NamedParameterJdbcTemplate namedParameterJdbcTemplate;

}