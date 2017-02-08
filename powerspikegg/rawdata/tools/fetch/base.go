package main

import (
	"flag"
	"runtime"

	"google.golang.org/grpc"
)

// base is an utility structure managing basic subcommand creation
type base struct {
	// name is the command name
	name string

	// synopsis contains the short command description
	synopsis string

	// usage contains the long command description
	usage string

	// address contains the rawdata fetcher address
	address string

	// connection contains the client connection, avoiding re-instantiation
	connection *grpc.ClientConn
}

// finalizer is a runtime finalizer closing connection when leaving the program
func finalizer(c *base) {
	if c.connection != nil {
		c.connection.Close()
	}
}

// Initialize register the command informations
func (c *base) Initialize(name string, synopsis string, usage string) {
	c.name = name
	c.synopsis = synopsis
	c.usage = usage

	c.connection = nil
	runtime.SetFinalizer(c, finalizer)
}

// SetFlags setups the common flags for all commands
func (c *base) SetFlags(f *flag.FlagSet) {
	f.StringVar(&c.address, "address", "localhost:50001",
		"Address on which the client should connect to reach the server.")
}

// Name returns the command name, i.e. its shortcut
func (c *base) Name() string {
	return c.name
}

// Synopsis returns a short description of the command
func (c *base) Synopsis() string {
	return c.synopsis
}

// Usage returns a long description of the command
func (c *base) Usage() string {
	return c.usage
}

// Connect opens a gRPC connection to the server
func (c *base) Connect() (*grpc.ClientConn, error) {
	if c.connection != nil {
		return c.connection, nil
	}

	conn, err := grpc.Dial(c.address, grpc.WithInsecure())
	if err != nil {
		return nil, err
	}
	c.connection = conn
	return c.connection, err
}
