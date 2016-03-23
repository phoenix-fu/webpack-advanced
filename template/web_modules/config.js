import configManager from './config.manager'

var config = {
	apiDomain: 'http://www.yao2o.local',
	version: 'Development'
}

config = configManager.extend(config)

export default config
