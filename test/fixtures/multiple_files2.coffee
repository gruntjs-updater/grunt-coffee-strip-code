( () ->

  foo = ''

  ## test-block-start ##
  bar = () ->
    myVar = 12
  ## test-block-end ##

  return {
    bar: "bar"
    ## test-block-start ## , two: "two" ## test-block-end ##
  }
)()
