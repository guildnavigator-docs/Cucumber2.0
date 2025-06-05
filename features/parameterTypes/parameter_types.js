import {defineParameterType} from '@cucumber/cucumber'

defineParameterType({
    name: 'validity',
    regexp: /(valid|invalid)/,
    transformer: (s) => s
});

defineParameterType({
    name: 'entity',
    regexp: /(worker|location|form)/,
    transformer: (s) => s+'s'
});

defineParameterType({
    name: 'authorize',
    regexp: /(authorize|unauthorize)/,
    transformer: (s) => s+"d"
});

