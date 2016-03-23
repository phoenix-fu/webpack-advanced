<template>
    <div>
    	<loaded-div>
    		<div style="position:relative;">
    			<select v-model="selectedProvince" @change="changeRegion('selectedProvince', 'provinces', 'citys')" @blur="sendBlur" class="form-control">  
    				<option value="">\{{defaultProvinceName}}</option>    
    				<option v-for="province in provinces" :value="province.name">    
    					\{{ province.name }}    
    				</option>    
    			</select>            
    			<span class="select-arrow fa fa-angle-down"></span>   
    		</div>
    		<div style="position:relative; margin-top:5px;">
    			<select v-model="selectedCity" @change="changeRegion('selectedCity', 'citys', 'areas')" @blur="sendBlur" class="form-control">
    				<option value="">\{{defaultCityName}}</option> 
    				<option v-for="city in citys" :value="city.name">    
    					\{{ city.name }}    
    				</option> 
    			</select>            
    			<span class="select-arrow fa fa-angle-down"></span>   
    		</div>                 
    		<div v-if="containItem('areas')" style="position:relative; margin-top:5px;">
    			<select v-model="selectedArea" @blur="sendBlur" class="form-control">
				    <option value="">\{{defaultAreaName}}</option> 
				    <option v-for="area in areas" :value="area.name">    
    					\{{ area.name }}    
    				</option> 
    			</select>            
    			<span class="select-arrow fa fa-angle-down"></span>   
    		</div>             
    	</loaded-div>
    </div> 
</template>

<script>
export default {
	props: {
        selectedProvince: {
            type: String,
            default: ''
        },

        selectedCity: {
            type: String,
            default: ''
        },

        selectedArea: {
            type: String,
            default: ''
        },

        showItems: {
            type: Array,
            default: ['provinces', 'citys', 'areas']
        },

        defaultProvinceName: {
            type: String,
            default: '请选择地区'
        },

        defaultCityName: {
            type: String,
            default: '请选择地区'
        },

        defaultAreaName: {
            type: String,
            default: '请选择地区'
        }
    },

    data: function () {
        return {
            loading: false,
            provinces: [],
            citys: [],
            areas: []
        }
    },

    methods: {
        containItem: function (item) {
            return $.inArray(item, this.showItems) >= 0
        },

        getId: function (changer, currentChildren) {
            for (index in this[currentChildren]) {
                if (this[currentChildren][index].name == this[changer]) {
                    return this[currentChildren][index].id
                }
            }
            return false
        },

        changeRegion: function (changer, currentChildren, updateChildren) {
            // debugger;
            var deferred = $.Deferred()

            if (!this.containItem(updateChildren)) {
                deferred.reject()
                return deferred.promise()
            }

            var id = this.getId(changer, currentChildren)
            if (id === false) {
                deferred.reject()
                return deferred.promise()
            }

            var self = this
            this.loading = true

            this.handleRequest($.getRequest(apis.region.list), { parent: id }).done(function (result) {
                self[updateChildren] = result.data
                deferred.resolve()
            }).fail(function () {
                self[updateChildren] = []
                deferred.reject()
            }).always(function () {
                self.loading = false
            })

            return deferred.promise()
        },

        sendBlur: function () {
            // console.log('send blur')
            this.$emit('item-blur')
        }
    },

    created: function () {
        this.$watch('loading', function (val) {
            this.$broadcast('show-loading', val)
        })

        var self = this
        this.$watch('selectedProvince', function (val) {
            self.selectedCity = ''
            self.citys = []
        })
        this.$watch('selectedCity', function (val) {
            self.selectedArea = ''
            self.areas = []
        })
    },

    activate: function (done) {
        var self = this

        this.handleRequest($.getRequest(apis.region.list)).done(function (result) {
            self.provinces = result.data
            // self.selectedProvince = self.selectedProvince == '' ? self.provinces[0].name : self.selectedProvince;

            if (self.selectedProvince != '') {
                self.changeRegion('selectedProvince', 'provinces', 'citys').done(function () {
                    // self.selectedCity = self.selectedCity == '' ? self.citys[0].name : self.selectedCity

                    if (self.selectedCity != '') {
                        self.changeRegion('selectedCity', 'citys', 'areas').done(function () {
                            // self.selectedArea = self.selectedArea == '' ? self.areas[0].name : self.selectedArea
                        })
                    }
                })
            }
        }).always(function () {
            done()
        })
    }
}
</script>
