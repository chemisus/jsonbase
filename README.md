# jsonbase

## JQL

JQL (json query language) is [going to be] a better way to query!

Select command:

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
            name: ["decode", "Y2hlbWlzdXMK"],                               // specify :name parameter
            password: ["decode", "c29tZSBwYXNzd29yZAo="]                    // specify :password parameter
        }                                                                   // end parameter values
    ]                                                                       // end query


Insert command:

    [                                                                       // start query
        [                                                                   // start statement
            "insert",                                                       // perform insert command
            ["table", "users"],                                             // into users table
            [                                                               // start records
                {},
                {},
                ...
                {}
            ],                                                              // end records
            [                                                               // start actions
                ["set", "created_at", ["param", "now"]                      // sets created_at to :now
            ]                                                               // end actions
        ],                                                                  // end statement
        {                                                                   // start parameter values
            now: ["call", "now"]                                            // specify :now parameter to be now()
        }                                                                   // end parameter values
    ]                                                                       // end query


Update command:

    [                                                                       // start query
        [                                                                   // start statement
            "update",                                                       // perform insert command
            ["table", "users"],                                             // into users table
            [                                                               // start actions
                ["set", "updated_at", ["param", "now"]                      // sets updated_at to :now
            ],                                                              // end actions
            [                                                               // start where clause
                "and",                                                      // "and operation" the next group together
                [                                                           // (
                    ["eq", ["get", "name"], ["param", "name"]],             //      name = :name,
                    ["eq", ["get", "password"], ["param", "password"]]      //      password = :password
                ]                                                           // )
            ]                                                               // end where clause
        ],                                                                  // end statement
        {                                                                   // start parameter values
            now: ["call", "now"]                                            // specify :now parameter to be now()
            name: ["decode", "Y2hlbWlzdXMK"],                               // specify :name parameter
            password: ["decode", "c29tZSBwYXNzd29yZAo="]                    // specify :password parameter
        }                                                                   // end parameter values
    ]                                                                       // end query


Delete command:

    [                                                                       // start query
        [                                                                   // start statement
            "delete",                                                       // perform delete command
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
            name: ["decode", "Y2hlbWlzdXMK"],                               // specify :name parameter
            password: ["decode", "c29tZSBwYXNzd29yZAo="]                    // specify :password parameter
        }                                                                   // end parameter values
    ]                                                                       // end query
