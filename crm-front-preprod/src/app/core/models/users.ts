export class User {

  constructor(
    // tslint:disable-next-line: variable-name
    public _id?: string,
    public name?: string,
    public firstname?: string,
    public lastname?: string,
    public email?: string,
    public password?: string,
    public status?: string,
    public data?: any,
    public stripe_id?: string,
    public card_brand?: string,
    public card_last_four?: string,
    public trial_ends_at?: string,
    public remember_token?: string,
    public last_login?: string,
    public score?: string,
    public actions?: string,
    public contacted?: string,
    public social_accounts?: any,
    public dashboards?: any,
    public benchmarks?: any,
    public pack?: any,
    public created_at?: any,
    public updated_at?: any,
    public deleted_at?: any,
    public pwd?: any,
    public provider_userId?: any,
  ) {}
}
