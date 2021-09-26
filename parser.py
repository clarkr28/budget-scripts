import os
import csv
import argparse

def create_parser():
    parser = argparse.ArgumentParser()
    parser.add_argument('-f', '--file', help='csv filename', dest='fname')
    return parser

if __name__ == '__main__':
    # parse arguments
    parser = create_parser()
    args = parser.parse_args()

    if not os.path.exists('./' + args.fname):
        print(f'file {args.fname} does not exist')
        exit()

    with open(args.fname) as fstream:
        fstream.readline()
        reader = csv.reader(fstream, delimiter=',',)
        # Group, Item, Type, Date, Merchant, Amount
        total = 0
        for row in reader:
            total += float(row[5])
        print(f'total: {total}')