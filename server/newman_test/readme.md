# every request should be independent

in pre-request load env variables to global
in test use only global

_v# is for temp global variables that you can use to
    keep data form request to response. after that
    they will invalid