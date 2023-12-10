import { Transaction } from '../../types';
import { detect, generate } from './eas';
import easAttest0xfed2349f from '../../test/transactions/eas-attest-mainnet-0xfed2349f.json';
import easAttestByDelegation0xb58d6544 from '../../test/transactions/eas-attest-by-delegation-optimism-0xb58d6544.json';
import easMultiAttest0x9bab2b2e from '../../test/transactions/eas-multi-attest-linea-0x9bab2b2e.json';
import easRevoke0x4ec6335e from '../../test/transactions/eas-revoke-base-0x4ec6335e.json';
import easTimestamp0x892d0c6e from '../../test/transactions/eas-timestamp-base-0x892d0c6e.json';
import easRevokeOffchain0xf38b96d0 from '../../test/transactions/eas-revoke-offchain-mainnet-0xf38b96d0.json';
import catchall0xc35c01ac from '../../test/transactions/catchall-0xc35c01ac.json';

// TODO: add tests for functions that haven't been called in production yet:
// - multiAttestByDelegation
// - revokeByDelegation
// - multiRevoke
// - multiRevokeByDelegation
// - multiTimestamp
// - multiRevokeOffChain

describe('EAS', () => {
  describe('attest', () => {
    it('Should detect transaction', () => {
      const match = detect(easAttest0xfed2349f as Transaction);
      expect(match).toBe(true);
    });

    it('Should generate context', () => {
      const transaction = generate(easAttest0xfed2349f as Transaction);
      expect(transaction.context.summaries.en.variables.attested?.type).toBe(
        'contextAction',
      );

      expect(transaction.context.variables).toMatchObject({
        from: { value: '0x3b60e31cfc48a9074cd5bebb26c9eaa77650a43f' },
        schema: {
          value:
            '0xc59265615401143689cbfe73046a922c975c99d97e4c248070435b1104b2dea7',
        },
        recipient: {
          value: '0x9934465Ee73BeAF148b1b3Ff232C8cD86c4c2c63',
        },
      });
    });
  });

  describe('attestByDelegation', () => {
    it('Should detect transaction', () => {
      const match = detect(easAttestByDelegation0xb58d6544 as Transaction);
      expect(match).toBe(true);
    });

    it('Should generate context', () => {
      const transaction = generate(
        easAttestByDelegation0xb58d6544 as Transaction,
      );
      expect(transaction.context.summaries.en.variables.attested?.type).toBe(
        'contextAction',
      );
      expect(transaction.context.variables).toMatchObject({
        from: { value: '0x917de4fec44841312f632d2a020867fe0c6aea43' },
        attester: { value: '0xc13D679471FEa46193891343EEAF761bFc52808E' },
        schema: {
          value:
            '0xeb2a4b4be5355128b420a8045a47750aab8ba427014401387a564bbed987d16c',
        },
        recipient: {
          value: '0x917DE4FEc44841312F632D2A020867Fe0c6AeA43',
        },
      });
    });
  });

  describe('multiAttest', () => {
    it('Should detect transaction', () => {
      const match = detect(easMultiAttest0x9bab2b2e as Transaction);
      expect(match).toBe(true);
    });

    it('Should generate context', () => {
      const transaction = generate(easMultiAttest0x9bab2b2e as Transaction);
      expect(transaction.context.summaries.en.variables.attested?.type).toBe(
        'contextAction',
      );
      expect(transaction.context.variables).toMatchObject({
        from: { value: '0x0fb166cddf1387c5b63ffa25721299fd7b068f3f' },
        schemas: { value: '1' },
        count: {
          value: '2',
        },
      });
    });
  });

  describe('revoke', () => {
    it('Should detect transaction', () => {
      const match = detect(easRevoke0x4ec6335e as Transaction);
      expect(match).toBe(true);
    });

    it('Should generate context', () => {
      const transaction = generate(easRevoke0x4ec6335e as Transaction);
      expect(transaction.context.summaries.en.variables.revoked?.type).toBe(
        'contextAction',
      );
      expect(transaction.context.variables).toMatchObject({
        from: { value: '0x6e91973dee716ed6859e7bb689c9bd2955bdb96e' },
        schema: {
          value:
            '0xd3f24e873e8df2d9bb9af6f08ea1ddf61f65754d023f3ea761081e3e6a226a80',
        },
      });
    });
  });

  describe('timestamp', () => {
    it('Should detect transaction', () => {
      const match = detect(easTimestamp0x892d0c6e as Transaction);
      expect(match).toBe(true);
    });

    it('Should generate context', () => {
      const transaction = generate(easTimestamp0x892d0c6e as Transaction);
      expect(transaction.context.summaries.en.variables.timestamped?.type).toBe(
        'contextAction',
      );
      expect(transaction.context.variables).toMatchObject({
        from: { value: '0x79ffc4cf151373226dcc59c9582395214a364358' },
      });
    });
  });

  describe('revokeOffchain', () => {
    it('Should detect transaction', () => {
      const match = detect(easRevokeOffchain0xf38b96d0 as Transaction);
      expect(match).toBe(true);
    });

    it('Should generate context', () => {
      const transaction = generate(easRevokeOffchain0xf38b96d0 as Transaction);
      expect(transaction.context.summaries.en.variables.revoked?.type).toBe(
        'contextAction',
      );
      expect(transaction.context.variables).toMatchObject({
        from: { value: '0xb2370e24dabd855bfcf87087740ca6bdb77ebd50' },
      });
    });
  });

  describe('Other transactions', () => {
    it('Should not detect transaction', () => {
      const match = detect(catchall0xc35c01ac as Transaction);
      expect(match).toBe(false);
    });
  });
});
