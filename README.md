# jsonbase

## JQL

JQL (json query language) is [going to be] a better way to query!

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

