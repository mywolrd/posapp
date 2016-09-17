import glob, os, sys, getopt
from subprocess import STDOUT, check_call, CalledProcessError

def main(argv):
    version = ""
    sqlscripts_dir = ""
    if os.getuid() == 0:
        try:
            opts, args = getopt.getopt(argv, "hv:d:") 
        except getopt.GetoptError:
            print "python pos_config.py -h -v <Postgres Version> -d <absolute path sql scripts directory>"
            sys.exit(2)
        for opt, arg in opts:
            if opt == "-h":
                print "python pos_config.py -h -v <Postgres Version> -d <absolute path sql scripts directory.>"
                sys.exit()
            elif opt == "-v":
                version = arg
            elif opt == "-d":
                sqlscripts_dir = arg
                
        if (sqlscripts_dir == ""):
            print "Must provide -d <absolute path sql scripts directory.>"
            sys.exit(2)
            
        postgres = "postgresql" + getPostgresVersion(version)
        
        #install postgreSQL
        check_call(["apt-get", "install", postgres], stdout=open(os.devnull, "wb"), stderr=STDOUT)

        #get sql script files.
        os.chdir(sqlscripts_dir)
        files = sorted([ os.path.join(sqlscripts_dir, file) for file in glob.glob("*.sql")])

        #run database, schema, user script.
        important_file = files[:1]
        files = files[1:]

        try:
            check_call(["sudo", "-u", "postgres", "psql", "-f", important_file[0]], stdout=open(os.devnull, "wb"), stderr=STDOUT)
        except CalledProcessError:
            print("Error creating database, schema, user.")
            sys.exit(2)

        #run table scripts.
        try:
            for file in files:
                check_call(["sudo", "-u", "postgres", "psql", "-d", "projects", "-f", file], stdout=open(os.devnull, "wb"), stderr=STDOUT)
        except CalledProcessError:
            print("Error creating tables.")
            sys.exit(2)
    else:
        print("Requires sudo.")
        sys.exit()

def getPostgresVersion(version):
    if version == "":
        return ""
    else:
        return "-" + version
        

if __name__ == "__main__":
    main(sys.argv[1:])
