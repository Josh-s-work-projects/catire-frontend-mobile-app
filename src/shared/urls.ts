import { AuthEndpoints } from "../app/modules/auth/api/endpoints";
import { CatalogEndpoints } from "../app/modules/catalog/api/endpoints";
import { FinanceEndpoints } from "../app/modules/finance/api/endpoints";
import { OrderEndpoints } from "../app/modules/orders/api/endpoints";

export type Services = 'auth' | 'catalog' | 'orders' | 'finance';

export type Endpoint = AuthEndpoints | CatalogEndpoints | OrderEndpoints | FinanceEndpoints