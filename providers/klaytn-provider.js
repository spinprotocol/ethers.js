'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var json_rpc_provider_1 = require("./json-rpc-provider");
var networks_1 = require("../utils/networks");
var properties_1 = require("../utils/properties");
var errors = __importStar(require("../errors"));
var KlaytnProvider = /** @class */ (function (_super) {
    __extends(KlaytnProvider, _super);
    function KlaytnProvider(network, apiAccessToken) {
        var _this = this;
        network = networks_1.getNetwork((network == null) ? 'klaytn' : network);
        var host = null;
        switch (network.name) {
            case 'klaytn':
                host = 'localhost:8551'; // TODO: Replace this when mainnet for klaytn is available
                break;
            case 'aspen':
                host = 'localhost:8551';
                break;
            default:
                throw new Error('unsupported network');
        }
        _this = _super.call(this, 'https://' + host + '/' + (apiAccessToken || ''), network) || this;
        errors.checkNew(_this, KlaytnProvider);
        properties_1.defineReadOnly(_this, 'apiAccessToken', apiAccessToken || null);
        return _this;
    }
    KlaytnProvider.prototype._startPending = function () {
        console.log('WARNING: KLAYTN does not support pending filters');
    };
    KlaytnProvider.prototype.getSigner = function (address) {
        errors.throwError('KLAYTN does not support signing', errors.UNSUPPORTED_OPERATION, { operation: 'getSigner' });
        return null;
    };
    KlaytnProvider.prototype.listAccounts = function () {
        return Promise.resolve([]);
    };
    return KlaytnProvider;
}(json_rpc_provider_1.JsonRpcProvider));
exports.KlaytnProvider = KlaytnProvider;
