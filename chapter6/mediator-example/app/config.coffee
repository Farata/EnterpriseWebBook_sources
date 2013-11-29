require.config
  paths:
    'mediator': 'Mediator',
    'pricePanel': 'PricePanel',
    'orderPanel': 'OrderPanel'
    'main': 'main'

unless window.requireTestMode
  require ['main'], ->