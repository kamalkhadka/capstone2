export default {
    "$schema": "http://json-schema.org/draft-07/schema",
    "$id": "http://example.com/example.json",
    "type": "object",
    "title": "The root schema",
    "description": "The root schema comprises the entire JSON document.",
    "default": {},
    "required": [
        "email",
        "password"
    ],
    "properties": {
        "email": {
            "$id": "#/properties/email",
            "type": "string",
            "title": "The email schema",
            "description": "An explanation about the purpose of this instance.",
            "default": ""
        },
        "password": {
            "$id": "#/properties/password",
            "type": "string",
            "title": "The password schema",
            "description": "An explanation about the purpose of this instance.",
            "default": ""
        }
    }
}