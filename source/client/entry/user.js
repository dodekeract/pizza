// region import

import {app, html} from 'hyperapp'

// internal

import actions from '../actions'
import effects from '../effects'

// views

import Cart from '../views/cart'
import Customize from '../views/customize'
import Main from '../views/main'
import Menu from '../views/menu'
import Order from '../views/order'

// endregion

// region render

window.addEventListener('load', () =>
	app({
		model: Object.assign({
			cart: [],
			customize: {
				toppings: {},
				size: 'xl',
				secondHalf: 'none'
			},
			checkout: {
				city: '',
				country: '',
				name: '',
				phone: '',
				street: '',
				to: 'branch',
				zipCode: ''
			},
			order: {
				cart: []
			}
		}, JSON.parse(localStorage.getItem('state')) || {}, {
			isLoading: false
		}),
		hooks: {
			onUpdate: (last, model) => localStorage.setItem('state', JSON.stringify(model))
		},
		effects,
		update: actions,
		view: {
			'/': Main,
			'/menu': Menu,
			'/cart': Cart,
			'/menu/:pizza/customize': Customize,
			'/order': Order
		},
		root: document.getElementById('root')
	})
)

// endregion
