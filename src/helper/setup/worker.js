import {
  Axis,
  Plot,
  ViewBuilder
} from '../../worker'

export function worker () {
  console.out = (type, wrk, box, data) => {
    if (type === 'fail' && !data.logged) {
      data.logged = true
      console.error(data)
    }
  }

  ViewBuilder.setup()
  Axis.setup()
  Plot.setup()
}
