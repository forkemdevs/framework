import * as Web3 from 'web3';
import { ConnectorBase, QueryRecipe, QueryBase, QueryKind, MutationIntent, MutationRecipe, MutationKind } from '@0xcert/connector';
import { FolderCheckAbilityQuery } from '../queries/folder-check-ability';
import { FolderReadMetadataQuery } from '../queries/folder-read-metadata';
import { FolderReadSupplyQuery } from '../queries/folder-read-supply';
import { FolderReadCapabilitiesQuery } from '../queries/folder-read-capabilities';
import { FolderCheckTransferStateQuery } from '../queries/folder-check-transfer-state';
import { FolderSetTransferStateMutation } from '../mutations/folder-set-transfer-state';

/**
 * Web3 connector configuration.
 */
export interface ConnectorConfig {
  web3?: Web3;
  approvalConfirmationsCount?: number;
}

/**
 * Web3 connector.
 */
export class Connector implements ConnectorBase {
  readonly web3: Web3;
  public approvalConfirmationsCount?: number;

  /**
   * Class constructor.
   * @param web3 Web3 object instance or web3 provider object.
   */
  public constructor(config?: ConnectorConfig) {
    this.web3 = this.buildWeb3(config.web3);
    this.approvalConfirmationsCount = config.approvalConfirmationsCount || 15;
  }

  /**
   * Returns a new Query object.
   * @param recipe Query recipe definition.
   */
  public createQuery(recipe: QueryRecipe): QueryBase {
    switch (recipe.queryKind) {
      case QueryKind.FOLDER_CHECK_ABILITY:
        return new FolderCheckAbilityQuery(this, recipe);
      case QueryKind.FOLDER_CHECK_TRANSFER_STATE:
        return new FolderCheckTransferStateQuery(this, recipe);
      case QueryKind.FOLDER_READ_CAPABILITIES:
        return new FolderReadCapabilitiesQuery(this, recipe);
      case QueryKind.FOLDER_READ_METADATA:
        return new FolderReadMetadataQuery(this, recipe);
      case QueryKind.FOLDER_READ_SUPPLY:
        return new FolderReadSupplyQuery(this, recipe);
      default:
        return null;
    }
  }

  /**
   * Returns a new Query object.
   * @param recipe Query recipe definition.
   */
  public createMutation(recipe: MutationRecipe): MutationIntent {
    switch (recipe.mutationKind) {
      case MutationKind.FOLDER_SET_TRANSFER_STATE:
        return new FolderSetTransferStateMutation(this, recipe);
      default:
        return null;
    }
  }

  /**
   * Returns a new Web3 instance.
   * @param web3 Web3 object instance or web3 provider object.
   */
  protected buildWeb3(web3?: any) {
    if (web3 && web3.currentProvider) {
      return new Web3(web3.currentProvider);
    } else {
      return new Web3(web3 || 'ws://localhost:8545');
    }
  }

}




const a = new Connector();
const b = a.createMutation({
  mutationKind: MutationKind.FOLDER_SET_TRANSFER_STATE,
  folderId: '',
  makerId: '',
  data: {
    isEnabled: true
  },
});