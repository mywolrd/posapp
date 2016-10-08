package com.pos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pos.model.application.Item;
import com.pos.model.application.ItemType;
import com.pos.service.ItemService;

@Controller
@RequestMapping("/item")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<List<Item>> listItems() {
        List<Item> items = itemService.listActiveItems();
        if (items.isEmpty())
            return new ResponseEntity<>(items, HttpStatus.NO_CONTENT);

        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @RequestMapping(value = "/type/list", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<List<ItemType>> listItemTypes() {
        List<ItemType> itemTypes = itemService.listItemTtypes();
        if (itemTypes.isEmpty())
            return new ResponseEntity<>(itemTypes, HttpStatus.NO_CONTENT);

        return new ResponseEntity<>(itemTypes, HttpStatus.OK);
    }

}