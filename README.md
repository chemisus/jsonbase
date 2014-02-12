# jsonbase

## JQL

JQL (json query language) is [going to be] a better way to query!

    [
        "select",
        ["from", "table1"],
        ["eq", ["get", "id"], ["param", "id"]],
        {"id":1}
    ]

    :id = 1
    select * from table1 where id = :id

