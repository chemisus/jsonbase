# jsonbase

## JQL

JQL (json query language) is [going to be] a better way to query!

Select command:

    select * from table1;
    [                                                                       // start query
        [                                                                   // start statement
            "select",                                                       // perform select command
            ["table", "users"],                                             // from users table
            [                                                               // start where clause
                "and",                                                      // "and operation" the next group together
                [                                                           // (
                    ["eq", ["get", "name"], ["param", "name"]],             //      name = :name,
                    ["eq", ["get", "password"], ["param", "password"]]      //      password = :password
                ]                                                           // )
            ]                                                               // end where clause
        ],                                                                  // end statement
        {                                                                   // start parameter values
            name: "",                                                       // specify :name parameter
            password: ""                                                    // specify :password parameter
        }                                                                   // end parameter values
    ]                                                                       // end query


Insert command:

    insert into table1 (id, created_at) values (1, now()), (2, now()), (3, now());
    [
        "insert",                                       // insert command
        "table1",                                       // table name
        [{id:1}, {id:2}, {id:3}],                            // individual records to insert
        [                                               // actions to perform on each record after being inserted
            ["set", "created_at", ["call", "now"]]      // sets created_at to the current datetime
        ]
    ]


Update command:

    update table1 set name = "chemisus" where id = 1;
    [
        "update",                                       // update command
        "table1",                                       // table to update
        ["eq", ["get", "id"], ["const", 1]],            // where clause
        [
            ["set", "name", ["const", "chemisus"]]      // sets name to "chemisus" on each record found
        ]
    ]


    [
        "select",
        ["from", "table1"],
        ["eq", ["get", "id"], ["param", "id"]],
        {"id":"MQ=="}
    ]

    :id = base64encode(1) // base64encode(1) => "MQ=="
    select * from table1 where id = :id



    [
        "select",
        ["from", "users"],
        [
            "and",
            [
                ["eq", ["get", "name"], ["param", "name"]],
                ["eq", ["get", "password"], ["param", "password"]],
            ]
        ]
        {
            "name":"Y2hlbWlzdXM="
            "password": "cGFzc3dvcmQ="
        }
    ]

    :name = base64encode("chemisus") // base64encode(1) => "Y2hlbWlzdXM="
    :password = base64encode("some password") // base64encode(1) => "c29tZSBwYXNzd29yZA=="
    select * from users where name = :name and password = :password

