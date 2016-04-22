import configManager from './config.manager'

var config = {
    apiDomain: '',
    version: 'Development',
    title: '微信客户分析专家'
}

config = configManager.extend(config)

export default config
